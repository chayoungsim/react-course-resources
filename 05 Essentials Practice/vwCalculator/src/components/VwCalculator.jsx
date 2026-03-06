import { useState, useEffect } from 'react'

const VwCalculator = () => {
    const [baseWidth, setBaseWidth] = useState(1920)
    const [pxValue, setPxValue] = useState("")
    const [vwValue, setVwValue] = useState("")

    //vw = (디자인 px 값 ÷ 기준 화면 너비) × 100

    useEffect(() => {
        if(!baseWidth || !pxValue) {
            setVwValue("");
            return;
        }
        const vw = (pxValue / baseWidth) * 100;
        setVwValue(vw.toFixed(2));
    },[baseWidth, pxValue])

    


    return (
        <section id="user-input">
            <div className="input-group1">
                <label htmlFor="baseWidth">Base Width</label>
                <input 
                    type="number" 
                    id="baseWidth" 
                    value={baseWidth}
                    onChange={(e) => setBaseWidth(e.target.value)}
                /> px 
            </div>
            <div className="input-group2">
                <input 
                    type="number" 
                    id="pxValue"
                    value={pxValue}
                    onChange={(e) => setPxValue(e.target.value)}
                /> px  
                <span className='bar'></span>
                <input 
                    type="number" 
                    id="vwValue"
                    value={vwValue}
                    readOnly
                /> vw
            </div>          
        </section>
    )
}

export default VwCalculator