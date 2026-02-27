import React from 'react'
import Section from './Section.jsx'
import CoreConcept from './CoreConcept'
import { CORE_CONCEPTS } from '../data.js'

const CoreConcepts = () => {
  return (
    <Section title="Core Concepts" id="core-concepts">        
        <ul>
            {
                CORE_CONCEPTS.map(concept => (
                    // <CoreConcept key={concept.title} title={concept.title} image={concept.image} description={concept.description} />
                    <CoreConcept key={concept.title} {...concept} />
                    
                ))
            }
            
        </ul>
    </Section>    
  )
}

export default CoreConcepts