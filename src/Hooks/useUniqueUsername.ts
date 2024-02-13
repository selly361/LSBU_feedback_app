import { useEffect, useState } from 'react'
import {
	uniqueNamesGenerator,
	adjectives,
	animals
} from 'unique-names-generator'

const useUniqueUsername = () => {
	const [username, setUsername] = useState<String>(localStorage.getItem("username") || "")

	useEffect(() => {
		if (!username) {
			const randomName = uniqueNamesGenerator({
				dictionaries: [adjectives, animals],
                separator: ''
			})

            setUsername(randomName)
            localStorage.setItem("username", randomName)
		}
	}, [])


    return username
}

export default useUniqueUsername
