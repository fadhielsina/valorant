import axios from 'axios'

const API_BASE = 'https://valorant-api.com/v1'

export async function fetchAgents() {
  try {
    const response = await axios.get(`${API_BASE}/agents`, {
      params: { isPlayableCharacter: true }
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching agents:', error)
    throw error
  }
}

export async function fetchWeapons() {
  try {
    const response = await axios.get(`${API_BASE}/weapons`)
    return response.data.data
  } catch (error) {
    console.error('Error fetching weapons:', error)
    throw error
  }
}

export async function getWeaponById(id) {
  try {
    const response = await axios.get(`${API_BASE}/weapons/${id}`)
    return response.data.data
  } catch (error) {
    console.error(`Error fetching weapon by ID ${id}:`, error)
    throw error
  }
}
