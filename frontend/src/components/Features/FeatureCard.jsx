import React from 'react'

function FeatureCard({header,subheader}) {
  return (
    <div style={{borderWidth:"4px"}}>
    <div class="card"  style={{width:"18rem"}}>
  <div class="card-body">
    <h5 class="card-title">{header}</h5>
    <p class="card-text">{subheader}</p>
  </div>
</div>
    </div>
  )
}

export default FeatureCard