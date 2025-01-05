SOURCE_FILE = 'index.html'
DEFAULT_FILE = 'default.html'
DESTINATION_FILE = 'output.html'
TYPING_SPEED = 0.05

def extract_tag_content(file, tag)
  content = File.read(file)
  match = content.match(/<#{tag}>(.*?)<\/#{tag}>/m)
  match ? match[1].strip : ''
end

def copy_and_update_html(default_file, source_file, destination_file, speed)
  title = extract_tag_content(source_file, 'title')
  body_content = extract_tag_content(source_file, 'body')

  File.open(destination_file, 'w') do |destination|
    File.foreach(default_file) do |line|
      if line.include?('<title>')
        destination.puts "<title>#{title}</title>"
      elsif line.include?('<body>')
        destination.puts "<body>"
        destination.flush
        sleep(speed)
        body_content.each_char do |char|
          destination.write(char)
          destination.flush
          sleep(speed)
        end
      elsif !line.include?('</body>') && !line.include?('<script src=')
        destination.puts line
      end
    end

    destination.puts "</body>"
    destination.puts "<script src='script.js'></script>"
  end

  puts "Arquivo atualizado e salvo em #{destination_file}!"
end

unless File.exist?(SOURCE_FILE) && File.exist?(DEFAULT_FILE)
  puts "Erro: Um dos arquivos necessários não foi encontrado."
  exit
end

copy_and_update_html(DEFAULT_FILE, SOURCE_FILE, DESTINATION_FILE, TYPING_SPEED)
