import React, { Component } from 'react'
import './Home.css'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      randomRun: [0, 1, 2, 3, 4, 6],
      battingPlayer: 'A',
      players: [{ player: 'A', score: 0 }, { player: 'B', score: 0 }],
      aScore: 0,
      bScore: 0,
      roundNo: 1
    }
    this.calculateRun = this.calculateRun.bind(this)
    this.play = this.play.bind(this)
  }

  calculateRun () {
    const { randomRun } = this.state
    const randomIndex = Math.floor(Math.random() * randomRun.length)
    return randomRun[randomIndex]
  }

  play () {
    let { players, battingPlayer, aScore, bScore } = this.state
    let rounds = 4
    for (let j = 1; j <= rounds + 1; j++) { // move to round 2 after 6 strikes
      if (j % 2 === 0) battingPlayer = 'B'
      else battingPlayer = 'A'
      if (j === rounds + 1) {
        console.log(aScore, bScore)
        if (aScore < bScore) console.log('Game winner B')
        else if (aScore > bScore) console.log('Game winner A')
        else if (aScore === bScore) console.log('Game drawn')
        return
      }
      console.log(`Round ${j}: ${battingPlayer} is batting`)
      for (let i = 1; i <= 6; i++) {
        const aThrow = this.calculateRun()
        const bThrow = this.calculateRun()
        if (aThrow === bThrow) {
          console.log(`A throws ${aThrow}, B throw ${bThrow}.`)
          battingPlayer = 'B'
          // roundNo++
          break
        } else if (aThrow !== bThrow) {
          if (battingPlayer === 'A') {
            aScore += aThrow
          } else if (battingPlayer === 'B') {
            bScore += bThrow
          }
          console.log(`A throws ${aThrow}, B throw ${bThrow}. ${battingPlayer} score ${(battingPlayer === 'A') ? aScore : bScore}`)
        }
      }
    }
  }

  componentDidMount () {
    console.log(this.play())
  }

  render () {
    return (
      <div id='home' ref='home' />
    )
  }
}

export default Home
