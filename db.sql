-- Adults Table
CREATE TABLE adults (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    nic TEXT NOT NULL UNIQUE,
    gender TEXT,
    dob DATE,
    address TEXT,
    occupation TEXT,
    contact TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Children Table
CREATE TABLE children (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    gender TEXT,
    dob DATE,
    parent_nic TEXT REFERENCES adults(nic),
    school TEXT,
    grade TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);