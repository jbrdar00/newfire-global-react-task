import { useContext, createContext } from 'react';
import './App.css';
import { useState } from 'react';

export const PhotosContext = createContext();
export const ThemeContext = createContext();
function App() {
  const [state, setState] = useState({ theme: 'light' });
  const themeSwitcher = (theme) => {
    setState({ theme });
  };
  return (
    <div className="App">
      <ThemeContext.Provider value={{ theme: state.theme }}>
        <PhotosContext.Provider
          value={{
            photos: [
              {
                imageSrc: 'https://via.placeholder.com/150',
                title: 'Title #1',
              },
              {
                imageSrc: 'https://via.placeholder.com/150',
                title: 'Title #2',
              },
            ],
            fetchPhotos: () => {},
          }}
        >
          <PhotosList />
          <button onClick={(x) => themeSwitcher('dark')}>Dark</button>
          <button onClick={(x) => themeSwitcher('light')}>Light</button>
        </PhotosContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

// Use functional or class component based on your preference.
// Make it a default export.
export function PhotosList() {
  const themeContext = useContext(ThemeContext);
  const photos = useContext(PhotosContext);
  const photosListContainerBackgroundColor =
    themeContext.theme === 'light' ? 'white' : 'black';
  const photoHeaderTextColor =
    themeContext.theme === 'light' ? 'black' : 'white';
  return (
    <div
      id="photos-list-container"
      style={{ background: photosListContainerBackgroundColor }}
    >
      <ul id="photos-list" style={{ listStyle: 'none' }}>
        {photos.photos.map((x) => (
          <li key={x.imageSrc}>
            <h3 style={{ color: photoHeaderTextColor }}>{x.title}</h3>
            <img src={x.imageSrc} alt={x.imageSrc} />
          </li>
        ))}
      </ul>
      <button id="fetch-photos" onClick={() => photos.fetchPhotos()}>
        Fetch Photos
      </button>
    </div>
  );
}
export default App;
