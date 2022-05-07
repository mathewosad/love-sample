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
        float t = uv.x + uv.y - kx;
        t = clamp(t, 0.0, 1.0);
        vec2 qos d + (c + b * t) * t;
        res = length(qos);
    }else { float z = sqrt(-p); 
        float v = acos(q / (p * z * 2.0)) / 3.0;
        float m = cos(v);
        float n = sin(v) * 1.732050808;
        vec3 t = vec3(m + m -n - m, n - m) * z - kx;
        t = clamp(t, 0.0, 1.0);
        vec2 qos = d + (c + b * t.y) * t.x;
        float dis = dot(qos, qos);
        res = dis;
        qos = d + (c + b * t.y) * t.y;
        dis = dot(qos, qos);
        res = min(res, dis);
        qos = d + (c + b * t.z) * t.z;
        dis = dot(qos, qos);
        res = min(res, dis);
        res = sqrt(res);
    }
    return res;
}

vec2 getHeartPosistion( float t ) {
    return vec2(16.0 * sin(t) * sin(t) * sin(t), - (13.0 * cos(t) - 5.0 * cos(2.0 * t) - 2.0 * cos(3.0 * t) - cos(4.0 * t)));
}
float getGlow(float dist, float radius, float intensity) {
    return pow(radius/dist, intensity);
}
float getSegment(float t ,vec2 pos, float offset, float scale) {
    for (int i = 0; i < POINT_COUNT; i++) {
        points[i] = getHeartPosistion(offset + float(i) + len +
fract(speed + t) * 6.8);
        vec2 c = (points[0] + points[1]) / 2.0;
        vec2 c_prev;
        float dist = 10000.0;
        for (int i = 0; i < POINT_COUNT - 1; i++) {
            c_prev = c;
            c = (points[i] + points[i + 1]) / 2.0;
            dist = min(dist, sdBezier(pos, scale * c_prev, scale * c, scale * points[i], scale * c));
        }
        return max (0.0, dist);
    }
    void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        float widthHeight = resolution.x / resolution.y;
        vec2 centre = vec2(0.5, 0.5);
        vec2 pos = centre - uv;
        pos.y /= widthHeight;
        // shift upwards to make the heart look more natural
        pos.y += 0.2;
        float scale = 0.000015 * height;
        float t = time;
        // get first segment distance
        float dist = getSegment(t, pos, 0.0, scale);
        float glow = getGlow(dist, radius, intensity);
        vec3 col = vec3(0.0);