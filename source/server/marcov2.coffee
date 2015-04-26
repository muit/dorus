class Core.Marcov2
  constructor: (@core)->
		#loadDictionary or Redis
		dictionary = {} 	
	newMessage: (message)->
		words = message.split " "
		for word in words
			word = dictionary[word]
			return if !word
