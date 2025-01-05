SOURCE_FILE = 'script.js'
DESTINATION_FILE = 'output.js'
TYPING_SPEED = 0.05

def simulate_typing(source, destination, speed)
  File.open(source, 'r') do |source_file|
    File.open(destination, 'w') do |destination_file|
      source_file.each_char do |char|
        destination_file.write(char)
        destination_file.flush
        sleep(speed)
      end
    end
  end
  puts "Conteúdo copiado para #{destination}!"
end

unless File.exist?(SOURCE_FILE)
  puts "Erro: Arquivo de origem '#{SOURCE_FILE}' não encontrado."
  exit
end

simulate_typing(SOURCE_FILE, DESTINATION_FILE, TYPING_SPEED)
