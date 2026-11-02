import Foundation
import SwiftNASR

@main
enum GenerateNavaids {
  static let cycle = Cycle.effective

  static var workingURL: URL { URL.currentDirectory() }
  static var outputURL: URL { workingURL.appendingPathComponent("ndbs.json") }

  static func main() async throws {
    if CommandLine.arguments.dropFirst() == ["--print-cycle"] {
      print(cycle)
      return
    }

    let nasr = NASR.fromInternetToMemory(activeAt: cycle.effectiveDate)!

    try await nasr.load()
    let parsed = try await nasr.parse(
      .navaids,
      errorHandler: { error in
        FileHandle.standardError.write(Data((error.localizedDescription + "\n").utf8))
        return .abort
      }
    )

    guard parsed else { throw GenerationError.incompleteDistribution }

    var NDBs = [NDB]()
    for navaid in await nasr.data.navaids! {
      if !navaid.isNDB || !navaid.isOperational { continue }
      guard let freq = navaid.frequency else { continue }

      NDBs.append(
        .init(
          id: navaid.id,
          name: navaid.name,
          latitude: Double(navaid.position.latitudeArcsec),
          longitude: Double(navaid.position.longitudeArcsec),
          frequency: String(Int(freq.converted(to: .kilohertz).value))
        )
      )
    }
    NDBs.sort(by: { $0.id < $1.id })

    let json = try JSONSerialization.data(withJSONObject: columns(of: NDBs), options: [.sortedKeys])
    try json.write(to: outputURL)
    try "\(cycle)\n".write(
      to: workingURL.appendingPathComponent("ndbs-cycle.txt"),
      atomically: true,
      encoding: .utf8
    )
  }

  /// The website reads `ndbs.json` as one array per field: a few hundred records of identical
  /// shape weigh far less that way than as objects repeating the same five keys.
  private static func columns(of NDBs: [NDB]) -> [String: [Any]] {
    [
      "id": NDBs.map(\.id),
      "name": NDBs.map(\.name),
      "lat": NDBs.map(\.latitude),
      "lon": NDBs.map(\.longitude),
      "freq": NDBs.map(\.frequency)
    ]
  }

  private enum GenerationError: Swift.Error {
    case incompleteDistribution
  }

  /// An operational NDB as the website consumes it: position in arc-seconds, frequency in
  /// kilohertz.
  private struct NDB {
    let id: String
    let name: String
    let latitude: Double
    let longitude: Double
    let frequency: String
  }
}
