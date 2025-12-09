// UWAGA: OSTATECZNY ZESTAW PAR - TRZECIE LOSOWANIE PO KOMPROMITACJI TAJEMNICY.
// Losowanie jest stałe i unikalne dla całej grupy.

// 🚨 KLUCZOWY ELEMENT: ZMIEŃ TEN KLUCZ PRZY KAŻDYM KOLEJNYM LOSOWANIU
// Używamy V3 (Wersja 3)
const LOCAL_STORAGE_KEY = 'secretSantaDraw_V3'; 

// 1. OSTATECZNE PARY DZIEWCZYN
const PARY_DZIEWCZYNY = {
    "amelia iwaszkiewicz": "Zuzanna Michalska",
    "amelia piccinini": "Anastazja Orska",
    "anastazja orska": "Maria Gołembska",
    "iga spychała": "Amelia Piccinini",
    "karina sokołowska": "Zuzanna Kijak",
    "maria gołembska": "Iga Spychała",
    "maria kubiak": "Amelia Iwaszkiewicz",
    "martyna nowakowska": "Maria Kubiak",
    "marysia kłos": "Karina Sokołowska",
    "natasza wilczyńska": "Martyna Nowakowska",
    "zuzanna kijak": "Natasza Wilczyńska",
    "zuzanna michalska": "Marysia Kłos"
};

// 2. OSTATECZNE PARY CHŁOPCÓW
const PARY_CHLOPCY = {
    "adam jastrzębski": "Eryk Żak",
    "adam kostrzewa": "Stanisław Burkiciak",
    "antek gąsiorek": "Piotr Konatkowski",
    "błażej litwin": "Kamil Długiewicz",
    "eryk żak": "Piotr Krzyżanowski",
    "jakub łuczak": "Łukasz Jessa",
    "jan horynecki": "Neel Puri",
    "kamil długiewicz": "Stanisław Szumigłowski",
    "mateusz skorupski": "Błażej Litwin",
    "neel puri": "Adam Kostrzewa",
    "piotr konatkowski": "Jan Horynecki",
    "piotr krzyżanowski": "Adam Jastrzębski",
    "stanisław burkiciak": "Wojciech Stańda",
    "stanisław szumigłowski": "Mateusz Skorupski",
    "wojciech stańda": "Antek Gąsiorek",
    "łukasz jessa": "Jakub Łuczak"
};

// Funkcja losuj() - logika
function losuj() {
    const inputElement = document.getElementById('nameInput');
    const resultElement = document.getElementById('result');
    
    resultElement.innerHTML = '';
    
    const imieNazwisko = inputElement.value.trim();
    if (imieNazwisko === "") {
        resultElement.innerHTML = "<p class='error'>Proszę wpisać swoje imię i nazwisko.</p>";
        return;
    }
    
    const imieNazwiskoLower = imieNazwisko.toLowerCase();
    
    let wylosowanaOsoba = null;

    // KROK 1: Sprawdzenie, czy wynik jest już zapisany w pamięci przeglądarki (NOWY KLUCZ)
    const storedResult = localStorage.getItem(`${LOCAL_STORAGE_KEY}_${imieNazwiskoLower}`);
    if (storedResult) {
        wylosowanaOsoba = storedResult;
        console.log("Wynik pobrany z LocalStorage.");
    } else {
        // KROK 2: Jeśli nie ma w LocalStorage, sprawdź stałe listy par
        if (PARY_DZIEWCZYNY.hasOwnProperty(imieNazwiskoLower)) {
            wylosowanaOsoba = PARY_DZIEWCZYNY[imieNazwiskoLower];
        } 
        else if (PARY_CHLOPCY.hasOwnProperty(imieNazwiskoLower)) {
            wylosowanaOsoba = PARY_CHLOPCY[imieNazwiskoLower];
        }

        // KROK 3: Jeśli znaleziono, zapisz do LocalStorage pod NOWYM KLUCZEM
        if (wylosowanaOsoba) {
            localStorage.setItem(`${LOCAL_STORAGE_KEY}_${imieNazwiskoLower}`, wylosowanaOsoba);
            console.log("Wynik zapisany w LocalStorage.");
        }
    }

    // Wyświetlanie wyniku
    if (wylosowanaOsoba) {
        resultElement.innerHTML = `
            <div class="success-box">
                <p class="congrats">🎉 Gratulacje, ${imieNazwisko}! 🎉</p>
                <p class="target-label">Przygotowujesz prezent dla:</p>
                <p class="target-name">${wylosowanaOsoba}</p>
                <p class="note">Wesołych Świąt! Ten wynik zostanie zapamiętany w Twojej przeglądarce.</p>
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
