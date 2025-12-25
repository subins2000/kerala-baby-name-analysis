require "../data/common"

@name_aliases = {
  "Bindhu" => ["Bindu"],
  "Aishwarya" => ["Aiswarya", "Aiswaria"],
  "Fathima" => ["Fatima"],
  "Geetha" => ["Geeta", "Gita"],
  "Sindhu" => ["Sindu"],
  "Soumya" => ["Sowmya"],
  "Anitha" => ["Anita"],
  "Sandhya" => ["Sandya"],
  "Siby" => ["Sibi"],
  "Muhammad" => ["Muhammed", "Mohammed"],
  "Abdul" => ["Abdhul"],
}

@name_aliases.each do |canonical, aliases|
  Human.where(call_name: aliases).update_all(call_name: canonical)
end
