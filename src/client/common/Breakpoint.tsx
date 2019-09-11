import React from 'react'
import MediaQuery from 'react-responsive'

const breakpoints:any = {
  desktop: '(min-width: 1025px)',
  phone: '(max-width: 1024px)',
}

type Props = {
  name: string,
  children: any
}

export function Breakpoint(props: Props) {
  const breakpoint = breakpoints[props.name] || breakpoints.desktop;
  return (
    <MediaQuery {...props} query={breakpoint}>
      {props.children}
    </MediaQuery>
  );
}

type PhoneProps = {
  children: any
}

export function PhoneBreakpoint(props: PhoneProps) {
  return (
    <Breakpoint name="phone">
      {props.children}
    </Breakpoint>
  );
}

export function DesktopBreakpoint(props: PhoneProps) {
  return (
    <Breakpoint name="desktop">
      {props.children}
    </Breakpoint>
  );
}