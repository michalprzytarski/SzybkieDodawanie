// Czas na rozwiązanie zadania (1000 * ilość_sekund_na_jedno_zadanie )
let trialTime = 1000 * 5;
// Licznik poziomu
let levelCounter = 0;
// Najwyższy poziom osiągnięty w sesji
let bestLevelCounter = 0;
// pierwszy składnik sumy
let a = 0;
// drugi składnik sumy
let b = 0;
// suma
let c = 0;
// czas pozostały do końca próby
let timeLeft = trialTime;

// zmienna potrzebana do kasowania niepotrzebnych timeoutów
let timeoutId;
// zmienna potrzebna do kasowania nieaktualnego timera
let intervalId;

// Funkcja resetująca podejście
function ResetTrial() {
  if (levelCounter > bestLevelCounter) {
    bestLevelCounter = levelCounter;
  }
  levelCounter = 0;
  document.getElementById("timer").innerHTML = "∞";
  Trial();
}

// Rozpoczęcie oczekiwania na pomiar czasu
function StartTimer() {
  //jeżeli istnieje poprzedni timeout trzeba go usunąć przed rozpoczęciem następnego
  if (timeoutId != null) {
    clearTimeout(timeoutId);
    clearInterval(intervalId);
    timeLeft = trialTime;
  }
  // ustawienie wartości startowej wyświetlanego czasu
  document.getElementById("timer").innerHTML = timeLeft / 1000;
  // rozpoczęcie odliczania timera
  intervalId = setInterval(TimerTick, 1000);
  // ustawienie nowego timeoutu
  timeoutId = setTimeout(Timeout, trialTime);
}

// funkcja tworzy następne zadanie po rozpoczęciu pomiaru czasu
function NextTrial() {
  // rozpoczęcie pomiaru czasu
  StartTimer(levelCounter);
  Trial();
}

// Obsługa nowego równania
function Trial() {
  // inkrementacja licznika pozimów
  levelCounter++;

  // wyświetlenie aktualnego poziomu
  document.getElementById("current-level-label").innerHTML = " " + levelCounter;
  // wyświetlenie aktualnego najwyższego poziomu
  document.getElementById("highest-level-label").innerHTML =
    " " + bestLevelCounter;

  // losowanie pierwszej liczby
  a = Math.floor(Math.random() * levelCounter * 100);
  // losownie drugiej liczby
  b = Math.floor(Math.random() * levelCounter * 100);
  // obliczanie sumy (poprawnej odpowiedzi)
  c = a + b;
  // losowanie na którym przycisku będzie prawidłowa odpowiedź (0-3)
  let correctAnsewr = Math.floor(Math.random() * 4) + 1;
  console.log("Poprawny index: " + correctAnsewr);

  // wyświetlenia wylosowanych składników
  document.getElementById("a-label").innerHTML = a.toString();
  document.getElementById("b-label").innerHTML = b.toString();

  // wyświetlenie odpowiedzi na przyciskach
  // przypisanie tekstu i przejścia do następnego pytania do przycisku z poprawną odpowiedzią
  document.getElementById("button" + correctAnsewr).innerHTML = c.toString();
  document.getElementById("button" + correctAnsewr).onclick = NextTrial;

  // przypisanie tekstu i wydarzenia onclick do przycisków z niepoprawną odpowiedzią
  for (let i = 1; i < 5; i++) {
    // tylko, jeżeli przycisk nie zawiera poprawnej odpowiedzi
    if (i != correctAnsewr) {
      let fakeAnsewr = 0;
      // losuj wartość tak długo, aż będzie się różniła od poprawnej
      do {
        fakeAnsewr =
          c + Math.floor(Math.random() * levelCounter * 10) - 5 * levelCounter;
      } while (fakeAnsewr == c);
      // Przypisz odpowiedni tekst do przycisku
      document.getElementById("button" + i).innerHTML = fakeAnsewr;
      // Przypisz odpowiednie zdarzenie do Event Listenera onclick
      document.getElementById("button" + i).onclick = WrongAnsewr;
    }
  }
}

// funkcja obsługująca wydzarzenie złej odpowiedzi
function WrongAnsewr() {
  alert("Zła odpowiedź!\nPoprawny wynik to " + c);
  ResetTrial();
}

//funkcja obsługująca przekroczenie limitu czasu na równanie
function Timeout() {
  // Upewnienie się, że czasomierz wskazuje 0
  document.getElementById("timer").innerHTML = "0";
  // Zakończenie odliczania na czasomierzu
  clearInterval(intervalId);
  alert("Koniec czasu!\nPoprawny wynik to " + c);
  ResetTrial();
}

//funkcja obsługująca zmianę wartości czasomierza
function TimerTick() {
  timeLeft -= 1000;
  document.getElementById("timer").innerHTML = timeLeft / 1000;
}
