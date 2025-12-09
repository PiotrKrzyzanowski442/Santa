// Listy uczestników
const dziewczyny = [
    "Amelia Iwaszkiewicz", "Amelia Piccinini", "Anastazja Orska", 
    "Iga Spychała", "Karina Sokołowska", "Maria Gołembska", 
    "Maria Kubiak", "Martyna Nowakowska", "Marysia Kłos", 
    "Natasza Wilczyńska", "Zuzanna Kijak", "Zuzanna Michalska"
];

const chlopcy = [
    "Adam Jastrzębski", "Adam Kostrzewa", "Antek Gąsiorek", 
    "Błażej Litwin", "Eryk Żak", "Jakub Łuczak", 
    "Jan Horynecki", "Kamil Długiewicz", "Mateusz Skorupski", 
    "Neel Puri", "Piotr Konatkowski", "Piotr Krzyżanowski", 
    "Stanisław Burkiciak", "Stanisław Szumigłowski", "Wojciech Stańda", 
    "Łukasz Jessa"
];

// Funkcja do tasowania tablicy (algorytm Fishera-Yatesa)
function tasuj(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Funkcja do tworzenia unikalnych par (A losuje B, B nie może być A)
function stworzPary(lista) {
    const listaTasowana = tasuj([...lista]);
    const pary = {};

    for (let i = 0; i < lista.length; i++) {
        const losujacy = lista[i];
        let wylosowanyIndex = (i + 1) % lista.length; // Losujemy cyklicznie, by nikt nie losował siebie

        pary[losujacy.toLowerCase()] = listaTasowana[wylosowanyIndex];
    }
    return pary;
}

// Tworzenie par przy ładowaniu strony
const paryDziewczyny = stworzPary(dziewczyny);
const paryChlopcy = stworzPary(chlopcy);

// Główna funkcja losująca
function losuj() {
    const inputElement = document.getElementById('nameInput');
    const resultElement = document.getElementById('result');
    
    // Czyszczenie poprzednich wyników
    resultElement.innerHTML = '';
    
    // Formatowanie wejścia
    const imieNazwisko = inputElement.value.trim();
    if (imieNazwisko === "") {
        resultElement.innerHTML = "<p class='error'>Proszę wpisać swoje imię i nazwisko.</p>";
        return;
    }
    
    const imieNazwiskoLower = imieNazwisko.toLowerCase();
    
    let wylosowanaOsoba = null;

    // Sprawdzanie w listach dziewczyn
    if (paryDziewczyny.hasOwnProperty(imieNazwiskoLower)) {
        wylosowanaOsoba = paryDziewczyny[imieNazwiskoLower];
    } 
    // Sprawdzanie w listach chłopaków
    else if (paryChlopcy.hasOwnProperty(imieNazwiskoLower)) {
        wylosowanaOsoba = paryChlopcy[imieNazwiskoLower];
    }

    // Wyświetlanie wyniku
    if (wylosowanaOsoba) {
        resultElement.innerHTML = `
            <div class="success-box">
                <p class="congrats">🎉 Gratulacje, ${imieNazwisko}! 🎉</p>
                <p class="target-label">Przygotowujesz prezent dla:</p>
                <p class="target-name">${wylosowanaOsoba}</p>
                <p class="note">Wesołych Świąt!</p>
            </div>
        `;
    } else {
        resultElement.innerHTML = `
            <p class='error'>
                Przepraszamy, nie znaleziono Cię na liście uczestników.
                Upewnij się, że imię i nazwisko jest wpisane poprawnie (np. Maria Kubiak).
            </p>
        `;
    }
}
