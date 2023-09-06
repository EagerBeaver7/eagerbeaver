import Link from 'next/link'
import Image from 'next/image'
import { styled } from '@mui/material'

export default function Home() {
  return (
    <div>
      <Link href="/">
        Home
      </Link>
      <br/>
      <Link href="/nickname">
        닉네임설정
      </Link>
      <br/>
      <Link href="/profileimg">
        프로필이미지설정
      </Link>
      <h1>시작페이지</h1>
      <p>가장먼저 라우팅</p>
    </div>
  )
}

