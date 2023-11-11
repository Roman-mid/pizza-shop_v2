import React from "react"
import ContentLoader from "react-content-loader"

const Sceleton: React.FC = () => (
  <ContentLoader className="pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#ebebeb"
    foregroundColor="#dedede"
  >
    <circle cx="140" cy="110" r="110" /> 
    <rect x="0" y="250" rx="9" ry="9" width="280" height="30" /> 
    <rect x="0" y="300" rx="9" ry="9" width="280" height="70" /> 
    <rect x="116" y="403" rx="9" ry="9" width="160" height="45" /> 
    <rect x="0" y="415" rx="9" ry="9" width="80" height="30" />
  </ContentLoader>
)

export default Sceleton;