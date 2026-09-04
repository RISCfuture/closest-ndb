// swift-tools-version: 6.3
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let upcomingFeatures: [SwiftSetting] = [
  .enableUpcomingFeature("NonisolatedNonsendingByDefault"),
  .enableUpcomingFeature("InferIsolatedConformances"),
  .enableUpcomingFeature("ImmutableWeakCaptures"),
  .enableUpcomingFeature("MemberImportVisibility"),
  .enableUpcomingFeature("ExistentialAny"),
  .enableUpcomingFeature("InternalImportsByDefault")
]

let package = Package(
  name: "generate-navaids",
  platforms: [.macOS(.v15)],
  dependencies: [
    // Dependencies declare other packages that this package depends on.
    .package(url: "https://github.com/RISCfuture/SwiftNASR.git", from: "4.1.1"),
    .package(url: "https://github.com/apple/swift-docc-plugin", from: "1.5.0")
  ],
  targets: [
    // Targets are the basic building blocks of a package. A target can define a module or a test suite.
    // Targets can depend on other targets in this package, and on products in packages this package depends on.
    .executableTarget(
      name: "generate-navaids",
      dependencies: ["SwiftNASR"],
      swiftSettings: upcomingFeatures
    ),
    .testTarget(
      name: "generate-navaidsTests",
      dependencies: ["generate-navaids"],
      swiftSettings: upcomingFeatures
    )
  ],
  swiftLanguageModes: [.v6]
)
