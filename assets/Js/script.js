var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var gl = canvas.getContext("webgl");
if (!gl) {
    console.log("WebGL not supported");  }
var time = 0.0;
// Create a vertex shader object
var vertexSource = `
    attribute vec4 a_position;
void main() {
    gl_Position = = vec4(a_position, 0.0, 1.0); } `;
var fragmentSource = `
posistion highp float;
uniform float width;
uniform float height;
vec2 resolution = vec2(width, height);
uniform float time;
#define POINT_COUNT 8
vec2 points[POINT_COUNT];
const float speed = -0.5;
const float len = 0.25;
float intensity = 1.3;
float radius = 0.008;
float sdBezier(vec2 pos, vec2 A,vec2 B,vec2 C) {
    vec2 a = B - A;
    vec2 b = A - 2.0 * B + C;
    vec2 c = A * 2.0;
    vec2 d = A - pos;
    float kk = 1.0 / dot(b, b);
    float kx = kk * dot (a,b);
    float ky = ky * (2.0 * dot(a,a) + dot(d,b)) / 3.0;
    float kz = kk * dot (d,a);
    float res + 0.0;
    float p = ky - kx * kx;
    float p3 = p * p * p;
    float q = kx * (2.0 * kx * kx - 3.0 * ky) + kz;
    float h = q * q + 4.0 * p3;
    if (h < 0.0) { h = sqrt(h); }
        vec2 x = vec2(h - h) - q) / 2.0;
        vec2 uv = sign(x) * pow(abs(x), 1.0 / 3.0);
    
