const masterData = {
    "Abu Jafar Md Jakaria": {
        course: "Competitive Programming Lab",
        code: "CSE 200",
        desig: "Senior Lecturer",
        dept: "Department Of Computer Science and Engineering"
    },
    "Samia Rahman Rima (DBMS)": {
        course: "Database Management System",
        code: "CSE 223",
        desig: "Lecturer",
        dept: "Department Of Computer Science and Engineering"
    },
    "Samia Rahman Rima (DBMS Lab)": {
        course: "Database Management System Lab",
        code: "CSE 224",
        desig: "Lecturer",
        dept: "Department Of Computer Science and Engineering"
    },
    "Sadman Sakib (Microprocessor)": {
        course: "Microprocessor & Interfacing",
        code: "CSE 237",
        desig: "Lecturer",
        dept: "Department of Electrical & Electronic Engineering"
    },
    "Sadman Sakib (Microprocessor Lab)": {
        course: "Microprocessor & Interfacing Lab",
        code: "CSE 238",
        desig: "Lecturer",
        dept: "Department of Electrical & Electronic Engineering"
    },
    "Farhana Akter": {
        course: "Geometry & Vector Analysis",
        code: "MAT 216",
        desig: "Lecturer",
        dept: "Department Of Computer Science and Engineering"
    }
};

let memberCount = 0;

// Handles Dropdown changes and displays the Custom Heading input field if needed
function handleDocTypeChange() {
    const docTypeSelect = document.getElementById('in-doc-type').value;
    const customHeadingInput = document.getElementById('in-custom-heading');
    
    if (docTypeSelect === "Custom") {
        customHeadingInput.style.display = "block";
    } else {
        customHeadingInput.style.display = "none";
        customHeadingInput.value = "";
    }
    updatePreview();
}

function toggleTitleInput() {
    const isChecked = document.getElementById('check-title').checked;
    const inputField = document.getElementById('in-assign-title');
    const outputField = document.getElementById('out-assign-title');
    
    inputField.style.display = isChecked ? "block" : "none";
    
    if (!isChecked) {
        inputField.value = "";
        outputField.innerText = "";
    }
    updatePreview();
}

function toggleGroupNameInput() {
    const isChecked = document.getElementById('check-group-name').checked;
    const inputField = document.getElementById('in-group-name');
    const outputWrapper = document.getElementById('out-group-name-wrapper');
    
    inputField.style.display = isChecked ? "block" : "none";
    outputWrapper.style.display = isChecked ? "block" : "none";
    
    if (!isChecked) {
        inputField.value = "";
        document.getElementById('out-group-name').innerText = "...";
    }
    updatePreview();
}

function toggleGroupInput() {
    const isChecked = document.getElementById('check-group').checked;
    const groupContainer = document.getElementById('group-input-container');
    const singleStudentInput = document.getElementById('single-student-input');
    
    const outSingleStudent = document.getElementById('out-single-student');
    const outGroupStudents = document.getElementById('out-group-students');

    if (isChecked) {
        groupContainer.style.display = "block";
        singleStudentInput.style.display = "none";
        outSingleStudent.style.display = "none";
        outGroupStudents.style.display = "block";
        
        const wrapper = document.getElementById('member-fields-wrapper');
        if (wrapper.children.length === 0) {
            addGroupMemberField();
        }
    } else {
        groupContainer.style.display = "none";
        singleStudentInput.style.display = "block";
        outSingleStudent.style.display = "block";
        outGroupStudents.style.display = "none";
    }
    updatePreview();
}

function addGroupMemberField() {
    memberCount++;
    const wrapper = document.getElementById('member-fields-wrapper');
    
    const row = document.createElement('div');
    row.className = 'member-input-row';
    row.id = `member-row-${memberCount}`;
    
    row.innerHTML = `
        <input type="text" class="grp-mem-name" placeholder="Member Name" oninput="updatePreview()">
        <input type="text" class="grp-mem-id" placeholder="ID (e.g. 242-115-001)" oninput="updatePreview()">
        <button type="button" class="remove-member-btn" onclick="removeGroupMemberField(${memberCount})">×</button>
    `;
    
    wrapper.appendChild(row);
    updatePreview();
}

function removeGroupMemberField(id) {
    const row = document.getElementById(`member-row-${id}`);
    if (row) { row.remove(); }
    updatePreview();
}

function autoFillAll() {
    const profKey = document.getElementById('in-prof-name').value;
    const data = masterData[profKey];

    if (data) {
        document.getElementById('in-course').value = data.course;
        document.getElementById('in-code').value = data.code;
        document.getElementById('in-prof-desig').value = data.desig;
        document.getElementById('in-prof-dept').value = data.dept;
    } else {
        document.getElementById('in-course').value = "";
        document.getElementById('in-code').value = "";
        document.getElementById('in-prof-desig').value = "";
        document.getElementById('in-prof-dept').value = "";
    }
    updatePreview();
}

function formatDate(dateString) {
    if (!dateString) return "__________________";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${day} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function updatePreview() {
    const mapping = {
        'in-course': 'out-course',
        'in-code': 'out-code',
        'in-prof-desig': 'out-prof-desig',
        'in-prof-dept': 'out-prof-dept',
        'in-student-name': 'out-student-name',
        'in-student-id': 'out-student-id',
        'in-assign-title': 'out-assign-title',
        'in-group-name': 'out-group-name'
    };

    // Compiles Document Heading logic (Default selection vs. Custom typed string)
    const docTypeSelect = document.getElementById('in-doc-type').value;
    if (docTypeSelect === "Custom") {
        const customVal = document.getElementById('in-custom-heading').value;
        document.getElementById('out-doc-type').innerText = customVal || "Custom Heading";
    } else {
        document.getElementById('out-doc-type').innerText = docTypeSelect;
    }

    const rawProfName = document.getElementById('in-prof-name').value;
    document.getElementById('out-prof-name').innerText = rawProfName.split(' (')[0] || "...";

    for (let inputId in mapping) {
        const inputEl = document.getElementById(inputId);
        const outEl = document.getElementById(mapping[inputId]);
        if (inputEl && outEl) {
            outEl.innerText = inputEl.value || "...";
        }
    }

    const isGroupChecked = document.getElementById('check-group').checked;
    if (isGroupChecked) {
        const names = document.getElementsByClassName('grp-mem-name');
        const ids = document.getElementsByClassName('grp-mem-id');
        const tbody = document.getElementById('out-member-rows');
        
        tbody.innerHTML = "";
        
        for (let i = 0; i < names.length; i++) {
            const mName = names[i].value || "................................................";
            const mId = ids[i].value || "........................";
            
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${mName}</td><td style="text-align:center;">${mId}</td>`;
            tbody.appendChild(tr);
        }
    }

    const rawDate = document.getElementById('in-date').value;
    document.getElementById('out-date').innerText = formatDate(rawDate);
}
