describe("Confirm link", async () => {
  it("sends invalid back if bad id sent", async () => {
    const response = await fetch(`${process.env.TEST_HOST}/confirm/12083`);
    const text = await response.text();
    expect(text).toEqual("invalid");
  });

  it("sends status 404 not found if .jpg extension specified with bad id sent", async () => {
    const response = await fetch(`${process.env.TEST_HOST}/confirm/12083.jpg`);
    expect(response.status).toEqual(404);
  });
});