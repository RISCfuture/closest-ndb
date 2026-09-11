import Darwin
import Foundation
import SwiftNASR

@main
enum GenerateNavaids {
  static var workingURL: URL { URL.currentDirectory() }
  static var distributionURL: URL { workingURL.appendingPathComponent("distribution.zip") }
  static var distributionPath: String { distributionURL.path }
  static var outputURL: URL { workingURL.appendingPathComponent("ndbs.json") }

  static func main() async throws {
    let nasr =
      FileManager.default.fileExists(atPath: distributionPath)
      ? NASR.fromLocalArchive(distributionURL) : NASR.fromInternetToFile(distributionURL)!

    _ = try await nasr.load()
    try await nasr.parse(
      .navaids,
      errorHandler: { error in
        fputs(error.localizedDescription + "\n", stderr)
        return .proceed
      }
    )

    var NDBs = [NDB]()
    for navaid in await nasr.data.navaids! {
      if !navaid.isNDB || !navaid.isOperational { continue }
      guard let freq = navaid.frequency else { continue }

      NDBs.append(
        .init(
          id: navaid.id,
          name: navaid.name,
          latitude: navaid.position.latitude.converted(to: .arcSeconds).value,
          longitude: navaid.position.longitude.converted(to: .arcSeconds).value,
          frequency: String(Int(freq.converted(to: .kilohertz).value))
        )
      )
    }
    NDBs.sort(by: { $0.id < $1.id })

    let json = try JSONSerialization.data(withJSONObject: columns(of: NDBs), options: [.sortedKeys])
    try json.write(to: outputURL)
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
