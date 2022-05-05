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
