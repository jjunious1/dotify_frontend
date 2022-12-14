import { useState, useEffect } from 'react'
import Client from '../services/api'
import { BASE_URL } from '../services/api'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import React from 'react'
import Nav from '../components/Nav'

const Browse = ({ authenticated, user, handleLogOut }) => {
  const [songs, setSongs] = useState([])
  const [playlist, setPlayList] = useState('')
  const [likeSong, setLikedSong] = useState({
    musicId: 0,
    userId: parseInt(user.id)
  })

  useEffect(() => {
    const getSongs = async () => {
      const response = await Client.get(`${BASE_URL}music`)
      setSongs(response.data)
    }
    getSongs()
  }, [])

  const addLikedSong = async (e) => {
    setLikedSong({ ...likeSong, ['musicId']: parseInt(e.target.value) })
  }

  const addLike = async (e) => {
    e.preventDefault()
    const add = await Client.post(`${BASE_URL}userpage`, likeSong)
    console.log(add)
  }

  const playSong = (e) => {
    setPlayList(e.target.value)
  }

  let authenticatedOptions
  if (user) {
    authenticatedOptions = (
      <div>
        <Nav
          authenticated={authenticated}
          user={user}
          handleLogOut={handleLogOut}
        />
        <ul>
          {songs.map((song) => (
            <div className="songs">
              <li key={song.id}>
                <img className="songimg" src={song.img} alt="artist" />
                <h3>{song.artists_name}</h3>
                <h4>{song.genre}</h4>
                <div className="buttons">
                  <button
                    className="play"
                    value={song.music_file}
                    onClick={playSong}
                  >
                    &#9658;
                  </button>
                  <form onSubmit={addLike}>
                    <button
                      className="heart"
                      type="submit"
                      value={song.id}
                      onClick={addLikedSong}
                    >
                      &#9829;
                    </button>
                  </form>
                </div>
              </li>
            </div>
          ))}
        </ul>
        <div className="container" id="footer">
          <AudioPlayer
            volume="0.5"
            autoPlay={false}
            src={playlist}
            showSkipControls
          />
        </div>
      </div>
    )
  }
  const publicOptions = (
    <div>
      <h3 className="browse_text">Please login or register to play music!</h3>
      <div>
        <ul>
          {songs.map((song) => (
            <div className="songs">
              <li key={song.id}>
                <img className="img_wrap" src={song.img} alt="artist" />
                <h3>{song.artists_name}</h3>
                <h4>{song.genre}</h4>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )

  return (
    <div>{authenticated && user ? authenticatedOptions : publicOptions}</div>
  )
}

export default Browse
