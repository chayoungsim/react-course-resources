
import Header from "./components/Header"
import Player from "./components/Player"

function App() {
  

  return (
    <>
        <Header />
        <main>
            <div id="game-container">
                <ol id="players">
                    <Player initPlayerName="player1" symbol="x" />
                    <Player initPlayerName="player2" symbol="0" />
                </ol>
            </div>
        </main>
    </>
  )
}

export default App
