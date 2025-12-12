'use client'

import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { EMPLOYEES } from '@/app/lib/employees'
import type { PrizeSlug } from '@/app/lib/types'
import { submitVote } from '@/app/actions/votes'

interface NameAutocompleteProps {
  prizeSlug: PrizeSlug
  onVoteSuccess: () => void
}

export function NameAutocomplete({ prizeSlug, onVoteSuccess }: NameAutocompleteProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const normalizedQuery = query.toUpperCase().trim()
  
  const filteredEmployees = normalizedQuery.length > 0
    ? EMPLOYEES.filter(emp => emp.includes(normalizedQuery))
    : []

  const showDropdown = isOpen && query.length > 0
  const hasResults = filteredEmployees.length > 0

  useEffect(() => {
    setHighlightedIndex(0)
  }, [filteredEmployees.length])

  useEffect(() => {
    if (listRef.current && highlightedIndex >= 0) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement
      if (item) {
        item.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [highlightedIndex])

  async function handleSelect(name: string) {
    setIsSubmitting(true)
    setQuery(name)
    setIsOpen(false)
    
    const result = await submitVote(prizeSlug, name)
    
    if (result.success) {
      onVoteSuccess()
    } else {
      alert(result.error || 'Error al votar')
    }
    
    setIsSubmitting(false)
    setQuery('')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showDropdown || !hasResults) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < filteredEmployees.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0)
        break
      case 'Enter':
        e.preventDefault()
        if (filteredEmployees[highlightedIndex]) {
          handleSelect(filteredEmployees[highlightedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        break
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Escribí NOMBRE Y APELLIDO..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value.toUpperCase())
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            // Delay to allow click on dropdown
            setTimeout(() => setIsOpen(false), 200)
          }}
          onKeyDown={handleKeyDown}
          disabled={isSubmitting}
          className="h-14 text-lg bg-purple-950/50 border-purple-700/50 text-white placeholder:text-purple-400/50 focus:border-purple-500 focus:ring-purple-500/20 uppercase"
        />
        {isSubmitting && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-purple-950/95 border border-purple-700/50 rounded-xl shadow-xl overflow-hidden z-50">
          {hasResults ? (
            <ul ref={listRef} className="max-h-64 overflow-y-auto py-2">
              {filteredEmployees.map((employee, index) => (
                <li key={employee}>
                  <button
                    type="button"
                    onClick={() => handleSelect(employee)}
                    className={`w-full px-4 py-3 text-left transition-colors ${
                      index === highlightedIndex
                      ? 'bg-purple-500/20 text-purple-100'
                      : 'text-purple-200 hover:bg-purple-900/50'
                    }`}
                  >
                    {highlightMatch(employee, normalizedQuery)}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-6 text-center">
              <p className="text-red-400 font-medium">
                No se encontró ningún empleado
              </p>
                <p className="text-purple-300/60 text-sm mt-1">
                Intentá con otro nombre
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function highlightMatch(text: string, query: string) {
  if (!query) return text
  
  const index = text.indexOf(query)
  if (index === -1) return text
  
  return (
    <>
      {text.slice(0, index)}
      <span className="text-purple-300 font-semibold">
        {text.slice(index, index + query.length)}
      </span>
      {text.slice(index + query.length)}
    </>
  )
}


