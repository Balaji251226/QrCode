import {useState} from "react"
import './QrCode.css'

export const QrCode = () => {
  const [img, setImg]= useState("")
  const [loading, setLoading] = useState(false)


  //linkedin profile "https://www.linkedin.com/in/balaji-k-g-9310302a0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 

  // Github link https://github.com/Balaji251226

  // 45 days live project link

  // Portfolio link https://balaji251226.github.io/Portfolio/
  const [qrData, setQrData] = useState("https://www.linkedin.com/in/balaji-k-g-9310302a0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app")
  const [qrSize, setQrSize] = useState("150")

  async function generateQr() {
    setLoading(true)
    try{
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`
      setImg(url)
    }
    catch(error) {
      console.log("Error Generating Qr Code ",error)
    }
      finally{
        setLoading(false)
      }
    }
    function downloadQr() {
      fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download = "qrcode.jpg"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }).catch((error) => {
        console.log("Error Downloading Qr Code",error)
      }) 
  }
    
  return (
    <div className="app-container">
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>Please wait...</p>}
        {img && <img src={img} className="qr-code-image"/>}
        <div>
            <label htmlFor="dataInput" className="input-label">
                Data for Qr Code :
            </label>
            <input type="text" id="dataInput" value={qrData} onChange={(e) => setQrData(e.target.value)} placeholder="Enter data for Qr Code"/>
            <label htmlFor="sizeInput" className="input-label">
                Image Size (e.g., 150) :
            </label>
            <input type="text" id="sizeInput" value={qrSize} onChange={(event) => setQrSize(event.target.value)} placeholder="Enter Image Size"/> 
            <button className="generate" disabled={loading} onClick={generateQr}>Generate Qr Code</button>
            <button className="download" onClick={downloadQr}>Download Qr Code</button>
        </div>
        <p className="footer">Designed by <a href="https://balaji251226.github.io/Portfolio/">Balaji</a></p>
    </div>
  )
}
