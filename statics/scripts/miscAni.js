let utils = {}

utils.ease = function(t) {
    if (t <= .5) return 2 * t * t
    t -= .5
    return 2 * t * (1 - t) + .5
}
utils.bezier = function(t) {
    return t * t * (3.0 - 2.0 * t)
}
utils.blend = function(t) {
    return (t * t) / (2 * (t * t - t) + 1)
}
