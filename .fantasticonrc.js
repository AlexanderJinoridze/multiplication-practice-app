module.exports = {
    inputDir: "./client/src/icons", // (required)
    outputDir: "./client/src/fonts/_Icons", // (required)
    fontTypes: ["eot", "svg", "ttf", "woff2", "woff"],
    assetTypes: ['css'],
    fontsUrl: "../fonts/_Icons",
    pathOptions: {
        css: "./client/src/css/icons.css",
    },
    getIconId: ({
        basename,
        relativeDirPath,
        absoluteFilePath,
        relativeFilePath,
        index,
    }) => [basename].join("_"),
};
