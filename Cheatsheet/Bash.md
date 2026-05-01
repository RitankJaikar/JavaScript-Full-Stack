NOTION MIGRATION DONE.

# Bash/Terminal Cheat Sheet

## Navigation

- `pwd` → Print current directory
- `ls` → List files in the directory
- `ls -la` → List all files (including hidden) with details
- `cd <directory>` → Change directory
- `cd ..` → Move up one directory
- `cd ~` → Go to home directory

## File & Directory Operations

- `mkdir <dir>` → Create a new directory
- `rmdir <dir>` → Remove empty directory
- `rm <file>` → Delete a file
- `rm -r <dir>` → Delete a directory and its contents
- `cp <source> <destination>` → Copy a file/directory
- `mv <source> <destination>` → Move/rename a file or directory
- `touch <file>` → Create an empty file
- `cat <file>` → Display file content
- `less <file>` → View file content page by page
- `nano <file>` → Open file in nano editor

## Permissions

- `chmod +x <file>` → Make a file executable
- `chmod 755 <file>` → Set file permissions (owner: all, others: read & execute)
- `chown <user>:<group> <file>` → Change file owner

## Process Management

- `ps aux` → Show all running processes
- `kill <PID>` → Kill a process by its PID
- `kill -9 <PID>` → Force kill a process
- `top` or `htop` → Monitor system processes
- `jobs` → List background jobs
- `fg %<job_id>` → Bring background job to foreground
- `bg %<job_id>` → Resume background job

## Searching & Filtering

- `grep '<pattern>' <file>` → Search for a pattern in a file
- `find <dir> -name '<file>'` → Find files by name
- `find <dir> -type f -size +10M` → Find files larger than 10MB
- `history | grep <command>` → Search command history

## Networking

- `ping <host>` → Check network connectivity
- `curl <URL>` → Fetch a web page
- `wget <URL>` → Download a file from the internet
- `netstat -tulnp` → Show open network ports

## File Compression

- `tar -cvf <archive.tar> <dir>` → Create a tar archive
- `tar -xvf <archive.tar>` → Extract a tar archive
- `zip -r <archive.zip> <dir>` → Create a zip archive
- `unzip <archive.zip>` → Extract a zip file

## System Information

- `df -h` → Show disk usage
- `du -sh <dir>` → Show directory size
- `free -h` → Show memory usage
- `uptime` → Show system uptime
- `whoami` → Show current user
- `uname -a` → Show system details

## Shortcuts

- `Ctrl + C` → Kill a running command
- `Ctrl + Z` → Suspend a command
- `Ctrl + D` → Logout/exit shell
- `!!` → Repeat last command
- `!<command>` → Run last used command starting with <command>

---

This cheat sheet covers essential Bash/Terminal commands for daily use. 🚀
