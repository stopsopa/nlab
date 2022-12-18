// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`generateCurl all parts - body as a string 1`] = `"curl -d '{\\"key\\":\\"value\\"}' x"`;

exports[`generateCurl all parts - headers empty object 1`] = `"curl x"`;

exports[`generateCurl all parts - headers value not string 1`] = `"curl x"`;

exports[`generateCurl all parts - multiline 1`] = `
"curl \\\\
-XPOST \\\\
-H \\"Content-type: application/json; charset=utf-8\\" \\\\
-H \\"X-custom: custom-value\\" \\\\
-d '{
    \\"some\\": \\"data\\"
}' \\\\
http://domain.com/path/endpoint"
`;

exports[`generateCurl all parts - no headers 1`] = `"curl x"`;

exports[
  `generateCurl all parts - no multiline 1`
] = `"curl -XPOST -H \\"Content-type: application/json; charset=utf-8\\" -H \\"X-custom: custom-value\\" -d '{\\"some\\":\\"data\\"}' http://domain.com/path/endpoint"`;

exports[`generateCurl all parts - slashParenthesis 1`] = `
"curl \\\\
-H \\"Content-type: application/json; charset=utf-8\\" \\\\
-H \\"X-custom: custom-\\\\\\"value\\" \\\\
-d '{
    \\"some\\": \\"data\\"
}' \\\\
http://domain.com/path/endpoint"
`;
