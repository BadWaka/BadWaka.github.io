function animate() {
    console.log('animate');
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);