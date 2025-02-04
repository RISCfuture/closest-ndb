// swift-tools-version: 6.0
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "generate-navaids",
    platforms: [.macOS(.v13)],
    dependencies: [
        // Dependencies declare other packages that this package depends on.
        .package(url: "https://github.com/RISCfuture/SwiftNASR.git", branch: "master")
    ],
    targets: [
        // Targets are the basic building blocks of a package. A target can define a module or a test suite.
        // Targets can depend on other targets in this package, and on products in packages this package depends on.
        .executableTarget(
            name: "generate-navaids",
            dependencies: ["SwiftNASR"]),
        .testTarget(
            name: "generate-navaidsTests",
            dependencies: ["generate-navaids"]),
    ],
    swiftLanguageModes: [.v6]
)
