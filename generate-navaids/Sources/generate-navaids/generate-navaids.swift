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
        return true
      }
    )

    var jsonDict = [[String: Encodable]]()
    for navaid in await nasr.data.navaids! {
      if !navaid.isNDB || !navaid.isOperational { continue }
      guard let freq = navaid.frequency else { continue }

      jsonDict.append([
        "id": navaid.ID,
        "name": navaid.name,
        "lat": navaid.position.latitude,
        "lon": navaid.position.longitude,
        "freq": String(freq / 1000)
      ])
    }
    jsonDict.sort(by: { ($0["id"] as! String) < ($1["id"] as! String) })

    let json = try JSONSerialization.data(
      withJSONObject: jsonDict,
      options: [.prettyPrinted, .sortedKeys]
    )
    try json.write(to: outputURL)
  }
}
