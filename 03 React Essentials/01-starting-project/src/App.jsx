
import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import CoreConcept from './components/CoreConcept.jsx'
import { CORE_CONCEPTS } from './data.js'

import TabButton from './components/TabButton.jsx'
import { EXAMPLES } from './data.js'

function App() {

  const [selectedTopic, setSelectedTopic] = useState();
  const handelSelect = (selectedButton) => {
    setSelectedTopic(selectedButton);
  }  

  let tabContent = <p>Please select a topic.</p>;
  if(selectedTopic) {
    tabContent = (
        <div id="tab-content">                
            <h3>{EXAMPLES[selectedTopic].title}</h3>
            <p>{EXAMPLES[selectedTopic].description}</p>
            <code>{EXAMPLES[selectedTopic].code}</code>
        </div>
    )
  }

  return (
    <div>      
      <Header />
      <main>
        <section id="core-concepts">
            <h2>Time to get started!</h2>
            <ul>
                {
                    CORE_CONCEPTS.map((concept) => (
                        <li key={concept.title}>
                            <CoreConcept {...concept} />
                        </li>
                    ))
                }                
            </ul>
        </section>
        
        <section id="examples">
            <h2>Examples</h2>
            <menu>                
                <TabButton isSelected={selectedTopic==='components'} onSelect={() => handelSelect('components')}>Components</TabButton>
                <TabButton isSelected={selectedTopic==='jsx'} onSelect={() => handelSelect('jsx')}>JSX</TabButton>
                <TabButton isSelected={selectedTopic==='props'} onSelect={() => handelSelect('props')}>Props</TabButton>
                <TabButton isSelected={selectedTopic==='state'} onSelect={() => handelSelect('state')}>State</TabButton>
            </menu>
            {tabContent}
        </section>
      </main>
    </div>
  )
}

export default App
