function main() {
  process.stdin.on("data", (inputStdin) => {
    const output = inputStdin.toString("utf8").split("").reverse().join("");

    process.stdout.write(output, console.error);
  });
}

main();
