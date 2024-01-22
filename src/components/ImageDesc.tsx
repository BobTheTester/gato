import styled from 'styled-components'
import React from 'react'
import { Bon } from '../contexts/dbContext'
import usedImage from '../img/used.png'

interface Props {
  className?: string
  bon: Bon
}

const ImageDescDisplay = ({ className, bon }: Props) => {
  return (
    <div className={className}>
      <img
        className={'main'}
        src={bon.imageUrl}
      />
      <h1 className={'title'}>{bon.title}</h1>
      <div className={'description'}>{bon.description}</div>
      {bon.isUsed && (
        <img
          className="used"
          src={usedImage}
        />
      )}
    </div>
  )
}

export const ImageDesc = styled(ImageDescDisplay)`
  margin: 1rem 1rem 0 1rem;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 1rem;

  img.main {
    width: 100%;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    display: block;
  }

  .description {
    padding: 1rem;
    background-color: #f5f5f5cc;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }

  .title {
    position: absolute;
    top: 1rem;
    width: 90%;
    height: 0;
    line-height: 0;
    color: #494949;
    z-index: 1;
    -webkit-filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
    border: 20px solid #ffffff8c;
    border-left: 0;
    border-right: 10px solid transparent;
  }

  img.used {
    width: 80%;
    position: absolute;
    top: 6rem;
    left: 10%;
    transform: rotate(-30deg);
    opacity: 30%;
    animation: spinner 500ms;
    @keyframes spinner {
      from {
        transform: scale(500%) rotate(0deg);
        opacity: 100%;
      }
      to {
        transform: rotate(-30deg) scale(100%);
        opacity: 30%;
      }
    }
  }
`
