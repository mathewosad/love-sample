var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var gl = canvas.getContext("webgl");
if (!gl) {
    console.log("WebGL not supported");  }
var time = 0.0;
// Create a vertex shader object
var vertexSource = `