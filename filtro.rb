require 'csv'

sugestoes = []
CSV.read('sugestoes.csv', headers: true).each do |row|
    # remover sugestões com descrição repetida
    if !sugestoes.include?(row['Descrição'])
        sugestoes << row['Descrição']
    end
end
sugestoes.each do |sugestao|
    puts sugestao
end