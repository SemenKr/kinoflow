import { Box, Drawer } from '@mui/material'
import { useRef } from 'react'

import {
  contentWrapSx,
  desktopSidebarWrapSx,
  drawerPaperSx,
  layoutSx,
  pageRootSx,
} from './FilteredMoviesPage.styles'
import { BackToTopButton } from './components/BackToTopButton'
import { FilterSidebar } from './components/FilterSidebar'
import { FilteredMoviesResults } from './components/FilteredMoviesResults'
import { ResultsHeader } from './components/ResultsHeader'
import { useFilteredMoviesPage } from './hooks/useFilteredMoviesPage'

export const FilteredMoviesPage = () => {
  const pageTopRef = useRef<HTMLDivElement | null>(null)
  const {
    isMobile,
    filters,
    results,
    genres,
    isLoading,
    isFetching,
    totalPages,
    currentPage,
    sortOptions,
    filterSidebarLabels,
    labels,
    hasActiveFilters,
    activeFilterCount,
    isMobileFiltersOpen,
    openMobileFilters,
    closeMobileFilters,
    handleResetFilters,
    handleSortChange,
    handleRatingChange,
    handleGenreToggle,
    handlePageChange,
  } = useFilteredMoviesPage()

  const renderFilterSidebar = () => (
    <FilterSidebar
      filters={filters}
      genres={genres}
      sortOptions={sortOptions}
      isMobile={isMobile}
      hasActiveFilters={hasActiveFilters}
      labels={filterSidebarLabels}
      onCloseMobile={closeMobileFilters}
      onReset={handleResetFilters}
      onSortChange={handleSortChange}
      onRatingChange={handleRatingChange}
      onGenreToggle={handleGenreToggle}
    />
  )

  const handlePaginationChange = (nextPage: number) => {
    handlePageChange(nextPage)
    pageTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Box ref={pageTopRef} sx={pageRootSx}>
      <Box sx={layoutSx}>
        {!isMobile && <Box sx={desktopSidebarWrapSx}>{renderFilterSidebar()}</Box>}

        <Box sx={contentWrapSx}>
          <ResultsHeader
            title={labels.pageTitle}
            subtitle={labels.pageSubtitle}
            isMobile={isMobile}
            hasActiveFilters={hasActiveFilters}
            activeFilterCount={activeFilterCount}
            resetLabel={labels.reset}
            showFiltersLabel={labels.filtersShow}
            resultsCountLabel={labels.resultsCount}
            activeFiltersLabel={labels.activeFilters}
            onOpenFilters={openMobileFilters}
            onReset={handleResetFilters}
          />

          <FilteredMoviesResults
            isLoading={isLoading}
            isFetching={isFetching}
            results={results}
            totalPages={totalPages}
            currentPage={currentPage}
            selectedGenresText={filters.genres.length > 0 ? labels.selectedGenres : undefined}
            emptyLabel={labels.noResults}
            onPageChange={handlePaginationChange}
          />
        </Box>
      </Box>

      <Drawer
        anchor="left"
        open={isMobileFiltersOpen}
        onClose={closeMobileFilters}
        slotProps={{ paper: { sx: drawerPaperSx } }}
      >
        {renderFilterSidebar()}
      </Drawer>

      <BackToTopButton label={labels.backToTop} />
    </Box>
  )
}
