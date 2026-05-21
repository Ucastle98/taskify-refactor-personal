import type { NextConfig } from 'next';

type SvgRule = {
  exclude?: RegExp;
  issuer?: unknown;
  resourceQuery?: unknown;
  test?: RegExp;
};

const isSvgRule = (rule: unknown): rule is SvgRule =>
  typeof rule === 'object' &&
  rule !== null &&
  'test' in rule &&
  rule.test instanceof RegExp &&
  rule.test.test('.svg');

const nextConfig: NextConfig = {
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find(isSvgRule);

    if (fileLoaderRule) {
      config.module.rules.push(
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/,
        },
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [/url/] },
          use: ['@svgr/webpack'],
        },
      );

      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },
};

export default nextConfig;
