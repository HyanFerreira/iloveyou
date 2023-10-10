function updateTimer() {
    const startDate = new Date('2022-06-13T00:00:00');
    const currentDate = new Date();
    const timeDifference = currentDate - startDate;

    const totalMilliseconds = timeDifference;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    let years = 0;
    let months = 0;
    let days = totalDays;

    // Calculando anos
    while (days >= 365) {
        if (isLeapYear(startDate.getFullYear())) {
            if (days >= 366) {
                days -= 366;
                years++;
            } else {
                break;
            }
        } else {
            days -= 365;
            years++;
        }
    }

    // Calculando meses
    while (days >= 30) {
        days -= 30;
        months++;
    }

    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    const timerText = document.querySelector('.content-timer')
    timerText.innerHTML = `
        <span class="years card-time">${years} ano</span>
        <span class="months card-time">${months} meses</span>
        <span class="days card-time">${days} dias</span>
        <span class="hours card-time">${hours} horas</span>
        <span class="minutes card-time">${minutes} minutos</span>
        <span class="seconds card-time">${seconds} segundos</span>
    `;

}

// Função para verificar se um ano é bissexto
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Atualize o temporizador a cada segundo
setInterval(updateTimer, 1000);

// Chame a função de atualização imediatamente
updateTimer();

window.ityped.init(document.querySelector(".ityped"), {
    strings: ['Eu te amo!', 'E sempre!', 'sempre!!!', 'Vou te amar!!', 'Meu Amor'],
    loop: true,
    typeSpeed: 150
});
