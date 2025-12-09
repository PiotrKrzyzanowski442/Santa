// UWAGA: Te pary są stałe i zostały wylosowane jednorazowo.
// DZIĘKI TEMU ZASADA UNIKALNOŚCI DZIAŁA DLA WSZYSTKICH UCZESTNIKÓW.

// 1. STAŁE PARY DZIEWCZYN (Dziewczyna losuje Dziewczynę)
const PARY_DZIEWCZYNY = {
    // KTO LOSUJE (Wpisuje Imię i Nazwisko) : KOGO LOSUJE (Dostaje Prezent)
    "amelia iwaszkiewicz": "Anastazja Orska",
    "amelia piccinini": "Zuzanna Michalska",
    "anastazja orska": "Karina Sokołowska",
    "iga spychała": "Zuzanna Kijak",
    "karina sokołowska": "Amelia Piccinini",
    "maria gołembska": "Maria Kubiak",
    "maria kubiak": "Iga Spychała",
    "martyna nowakowska": "Natasza Wilczyńska",
    "marysia kłos": "Martyna Nowakowska",
    "natasza wilczyńska": "Marysia Kłos",
    "zuzanna kijak": "Amelia Iwaszkiewicz",
    "zuzanna michalska": "Maria Gołembska"
};

// 2. STAŁE PARY CHŁOPCÓW (Chłopak losuje Chłopaka)
const PARY_CHLOPCY = {
    // KTO LOSUJE (Wpisuje Imię i Nazwisko) : KOGO LOSUJE (Dostaje Prezent)
    "adam jastrzębski": "Łukasz Jessa",
    "adam kostrzewa": "Wojciech Stańda",
    "antek gąsiorek": "Piotr Krzyżanowski",
    "błażej litwin": "Mateusz Skorupski",
    "eryk żak": "Jan Horynecki",
    "jakub łuczak": "Kamil Długiewicz",
    "jan horynecki": "Adam Jastrzębski",
    "kamil długiewicz": "Eryk Żak",
    "mateusz skorupski": "Błażej Litwin",
    "neel puri": "Stanisław Szumigłowski",
    "piotr konatkowski": "Stanisław Burkiciak",
    "piotr krzyżanowski": "Adam Kostrzewa",
    "stanisław burkiciak": "Neel Puri",
    "stanisław szumigłowski": "Antek Gąsiorek",
    "wojciech stańda": "Jakub Łuczak",
    "łukasz jessa": "Piotr Konatkowski"
};


// Główna funkcja losująca (nie zmienia się)
function losuj() {
    const inputElement = document.getElementById('nameInput');
    const resultElement = document.getElementById('result');
    
    // Czyszczenie poprzednich wyników
    resultElement.innerHTML = '';
    
    // Formatowanie wejścia do małych liter dla dopasowania
    const imieNazwisko = inputElement.value.trim();
    if (imieNazwisko === "") {
        resultElement.innerHTML = "<p class='error'>Proszę wpisać swoje imię i nazwisko.</p>";
        return;
    }
    
    const imieNazwiskoLower = imieNazwisko.toLowerCase();
    
    let wylosowanaOsoba = null;

    // 1. Sprawdzanie w listach dziewczyn
    if (PARY_DZIEWCZYNY.hasOwnProperty(imieNazwiskoLower)) {
        wylosowanaOsoba = PARY_DZIEWCZYNY[imieNazwiskoLower];
    } 
    // 2. Sprawdzanie w listach chłopaków
    else if (PARY_CHLOPCY.hasOwnProperty(imieNazwiskoLower)) {
        wylosowanaOsoba = PARY_CHLOPCY[imieNazwiskoLower];
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
