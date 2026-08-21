import CopyWebpackPlugin from "copy-webpack-plugin";
import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(
              __dirname,
              "node_modules/cesium/Build/Cesium"
            ),
            to: "static/cesium",
          },
        ],
      })
    );

    return config;
  },
};

export default nextConfig;