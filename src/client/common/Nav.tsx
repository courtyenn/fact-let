import React from 'react'
import { Link } from 'react-router-dom'
import { PhoneBreakpoint, DesktopBreakpoint } from './Breakpoint'

export default function Nav() {
  return (
    <nav>
      <div className="wrapper">
        <Link to="/" className={"logo"}>Get the Facts Straight</Link>
        <DesktopBreakpoint>
          <ul className="menu">
            {getLinks()}
          </ul>
        </DesktopBreakpoint>
        <PhoneBreakpoint>
          <button aria-label="Mobile nav">
            <span className="icon-menu"></span>
          </button>
          <ul className="mobile-navigation">
            {getLinks()}
          </ul>
        </PhoneBreakpoint>
      </div>
    </nav>
  )

  function getLinks(){
    return (<>
      <li><Link to="/create">Create your own quiz</Link></li>
      <li><Link to="/quizzes">View others</Link></li>
    </>)
  }
}