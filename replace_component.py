import sys

with open(r'd:\Project\SD_Taxation_Full_Project\sdtaxation-school_management_frontend\src\pages\StudentList.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

with open(r'd:\Project\SD_Taxation_Full_Project\sdtaxation-school_management_frontend\new_edit_form.tsx_txt', 'r', encoding='utf-8') as f:
    new_content = f.read()

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if "if (isEditing) {" in line and start_idx == -1:
        start_idx = i
    if "return (" in line and "space-y-6" in lines[i+1] and start_idx != -1 and i > start_idx + 10:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    lines[start_idx:end_idx] = [new_content + "\n"]
    with open(r'd:\Project\SD_Taxation_Full_Project\sdtaxation-school_management_frontend\src\pages\StudentList.tsx', 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Success")
else:
    print(f"Failed. Start: {start_idx}, End: {end_idx}")
