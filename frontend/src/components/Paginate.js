import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  const pathSelect = (x) => {
    return !isAdmin ? keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}` : (
      `/admin/emotelist/${x + 1}`
    )
  }
  return pages > 1 && (
    <Pagination>
      {[...Array(pages).keys()].map(x => (
        <LinkContainer 
          key={x + 1} 
          to={pathSelect(x)}
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  )
}

export default Paginate
