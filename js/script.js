function updateTimer() {
    const startDate = new Date('2022-06-11T00:00:00');
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

    // Calculando meses e dias
    months = Math.floor(days / 30); // Aproximação de meses, assumindo 30 dias por mês
    days %= 30; // Atualizando o número de dias restantes após subtrair os meses

    // Ajustando para meses com mais ou menos de 30 dias
    const startDatePlusMonths = new Date(startDate); // Criando uma cópia da data inicial
    startDatePlusMonths.setMonth(startDatePlusMonths.getMonth() + months); // Adicionando meses à data inicial
    const endDateOfLastMonth = new Date(startDatePlusMonths); // Criando uma cópia da data após adicionar os meses
    endDateOfLastMonth.setMonth(endDateOfLastMonth.getMonth() + 1); // Avançando para o próximo mês
    endDateOfLastMonth.setDate(0); // Configurando o dia para 0, que é o último dia do mês anterior

    // Verificando se há mais dias do que o último dia do mês
    if (days > endDateOfLastMonth.getDate()) {
        // Se houver, ajustamos os dias e os meses
        days -= endDateOfLastMonth.getDate();
        months++;
    }

    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    const timerText = document.querySelector('.content-timer');
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


