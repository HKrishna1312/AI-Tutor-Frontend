import { useEffect, useState } from 'react'
import { uploadSteps, sleep } from '../../data/upload'

export default function UploadExperience({ fileName, onDone }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    let cancelled = false
    async function run() {
      for (let i = 0; i < uploadSteps.length; i++) {
        if (cancelled) return
        setActive(i)
        await sleep(750)
      }
      onDone()
    }
    run()
    return () => { cancelled = true }
  }, [onDone])

  const pct = Math.round(((active + 1) / uploadSteps.length) * 100)

  return (
    <div className="overlay">
      <div className="proc-card">
        <div className="proc-head">
          <div className="spark"><span className="material-symbols-outlined" style={{ fontSize: 20 }}>auto_awesome</span></div>
          <div>
            <h2>Analyzing your resume…</h2>
            <p>{fileName}</p>
          </div>
        </div>

        <div className="stepper">
          {uploadSteps.map((step, i) => (
            <div key={step.name} className={`step ${i < active ? 'done' : i === active ? 'active' : ''}`}>
              <span className="s-ic">
                {i < active ? (
                  <span className="material-symbols-outlined" style={{ fontSize: 13 }}>check</span>
                ) : (
                  <span className="material-symbols-outlined" style={{ fontSize: 13 }}>auto_awesome</span>
                )}
              </span>
              <span className="s-label">{step.name}</span>
              {i === active && <span className="s-status">working…</span>}
            </div>
          ))}
        </div>

        <div className="progress-wrap">
          <div className="p-meta"><span>Processing pipeline</span><strong>{pct}%</strong></div>
          <div className="bar"><div className="bar-fill" style={{ width: `${pct}%` }} /></div>
        </div>
        <div className="loading-bar" />
      </div>
    </div>
  )
}