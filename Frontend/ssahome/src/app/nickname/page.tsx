import React from 'react'
import Link from 'next/link'

type Props = {}

function nickname({}: Props) {
  return(
    <div>
      <Link href="/">
        Home
      </Link>
      <br/>
      <Link href="/nickname">
        닉네임설정
      </Link>
      <br/>
      nickname
    </div>
  )
}

export default nickname