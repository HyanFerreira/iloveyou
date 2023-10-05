const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const particles = []
const heartCurve = []
const WIDTH = (canvas.width = innerWidth)
const HEIGHT = (canvas.height = innerHeight)
const numParticles = 64

const getRandom = (min, max) => Math.random() * (max - min) + min

for (let i = 0; i < 20; i += 0.2) {
    heartCurve.push([
        WIDTH / 2 + 210 * Math.pow(Math.sin(i), 3),
        HEIGHT / 2 + 13 * -(15 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i))
    ])
}

for (let i = 0; i < numParticles; i++) {
    const x = getRandom(0, WIDTH)
    const y = getRandom(0, HEIGHT)
    const size = getRandom(60, 100)
    const brightness = getRandom(20, 80)
    const particle = []

    for (let k = 0; k < numParticles; k++) {
        particle[k] = {
            x,
            y,
            velocityX: 0,
            velocityY: 0,
            radius: 1 - k / numParticles + 0.7,
            speed: Math.random() + 1,
            targetIndex: Math.floor(Math.random() * numParticles),
            direction: 2 * (i % 4) - 1,
            fade: 0.2 * Math.random() + 0.5,
            color: `hsla(0, ${Math.floor(size)}%, ${Math.floor(brightness + 10)}%, 1)`
        }
    }
    particles.push(particle)
}

function drawParticle(particle) {
    context.fillStyle = particle.color
    context.beginPath();
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
    context.closePath()
    context.fill()
}

function run() {
    context.fillStyle = 'rgba(0, 0, 0, 0.1)'
    context.fillRect(0, 0, WIDTH, HEIGHT)

    for (let i = numParticles - 1; i >= 0; i--) {
        const particle = particles[i]
        const currentParticle = particle[0]
        const target = heartCurve[currentParticle.targetIndex]
        let distanceX = currentParticle.x - target[0]
        let distanceY = currentParticle.Y - target[1]
        let distance = Math.sqrt(distanceX * distanceX, distanceY * distanceY)

        drawParticle(currentParticle)

        if (distance < 10) {
            if (Math.random() > 0.95) {
                currentParticle.targetIndex = Math.floor(Math.random() * numParticles)
            } else {
                if (Math.random() > 0.99) {
                    currentParticle.direction *= -1
                }

                currentParticle.targetIndex += currentParticle.direction
                currentParticle.targetIndex %= numParticles

                if (currentParticle.targetIndex < 0) {
                    currentParticle.targetIndex += numParticles
                }
            }
        }

        currentParticle.velocityX += (-distanceX / distance) * currentParticle.speed
        currentParticle.velocityY += (-distanceY / distance) * currentParticle.speed
        currentParticle.x += currentParticle.velocityX
        currentParticle.y += currentParticle.velocityY
        currentParticle.velocityX *= currentParticle.fade
        currentParticle.velocityY *= currentParticle.fade

        for (let k = 0; k < numParticles - 1; k++) {
            const current = particle[k]
            const next = particle[k + 1]
            next.x -= 0.7 * (next.x - current.x)
            next.y -= 0.7 * (next.y - current.y)
            drawParticle(next)
        }
    }

    requestAnimationFrame(run)
}

run();